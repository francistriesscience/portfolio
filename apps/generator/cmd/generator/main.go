package main

import (
	"flag"
	"fmt"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	"portfolio/generator/internal/notes"
	"portfolio/generator/internal/ogs"
)

func main() {
	command, args := parseCommand(os.Args[1:])
	workingDir, err := os.Getwd()
	if err != nil {
		log.Fatalf("resolve working directory: %v", err)
	}

	flags := flag.NewFlagSet("generator", flag.ExitOnError)
	notesDir := flags.String("notes-dir", filepath.Join("contents", "notes"), "directory containing note MDX files")
	outputDir := flags.String("output-dir", filepath.Join("..", "web", "lib", "generated"), "output directory for generated note files")
	pollInterval := flags.Duration("poll-interval", time.Second, "poll interval for watch mode")
	flags.Parse(args)

	generator := ogs.NewGenerator(workingDir)

	switch command {
	case "notes":
		runNotes(*notesDir, *outputDir)
	case "ogs":
		runOGs(generator)
	case "sync", "":
		runNotes(*notesDir, *outputDir)
		runOGs(generator)
	case "watch":
		runWatch(generator, *notesDir, *outputDir, *pollInterval)
	default:
		log.Fatalf("unknown command %q", command)
	}
}

func parseCommand(args []string) (string, []string) {
	if len(args) == 0 {
		return "sync", nil
	}

	if strings.HasPrefix(args[0], "-") {
		return "sync", args
	}

	return args[0], args[1:]
}

func runNotes(notesDir string, outputDir string) {
	files, err := notes.ParseDirectory(notesDir)
	if err != nil {
		log.Fatalf("Parse notes: %v", err)
	}

	if err := notes.WriteGenerated(outputDir, files); err != nil {
		log.Fatalf("Write generated notes: %v", err)
	}

	fmt.Printf("Generated %d notes\n", len(files))
}

func runOGs(generator *ogs.Generator) {
	if err := generator.Generate(); err != nil {
		log.Fatalf("Generate ogs: %v", err)
	}
}

func runWatch(generator *ogs.Generator, notesDir string, outputDir string, pollInterval time.Duration) {
	watchTargets := []string{
		notesDir,
		filepath.Join("templates", "og.html"),
		filepath.Join("public", "fonts", "dm-sans"),
	}

	if err := runOnce(notesDir, outputDir, generator); err != nil {
		log.Fatalf("Initial generation: %v", err)
	}

	lastSnapshot, err := snapshot(watchTargets)
	if err != nil {
		log.Fatalf("Snapshot watch targets: %v", err)
	}

	fmt.Println("watching generator inputs")
	ticker := time.NewTicker(pollInterval)
	defer ticker.Stop()

	for range ticker.C {
		currentSnapshot, err := snapshot(watchTargets)
		if err != nil {
			log.Fatalf("Snapshot watch targets: %v", err)
		}

		if snapshotsEqual(lastSnapshot, currentSnapshot) {
			continue
		}

		if err := runOnce(notesDir, outputDir, generator); err != nil {
			log.Printf("Regeneration failed: %v", err)
			continue
		}

		lastSnapshot = currentSnapshot
	}
}

func runOnce(notesDir string, outputDir string, generator *ogs.Generator) error {
	files, err := notes.ParseDirectory(notesDir)
	if err != nil {
		return fmt.Errorf("Parse notes: %w", err)
	}

	if err := notes.WriteGenerated(outputDir, files); err != nil {
		return fmt.Errorf("Write generated notes: %w", err)
	}

	if err := generator.Generate(); err != nil {
		return fmt.Errorf("Generate ogs: %w", err)
	}

	fmt.Printf("Generated %d notes and ogs\n", len(files))
	return nil
}

type fileSnapshot map[string]fileSignature

type fileSignature struct {
	ModTime int64
	Size    int64
}

func snapshot(paths []string) (fileSnapshot, error) {
	state := make(fileSnapshot)

	for _, target := range paths {
		if err := collectSnapshot(target, state); err != nil {
			return nil, err
		}
	}

	return state, nil
}

func collectSnapshot(target string, state fileSnapshot) error {
	info, err := os.Stat(target)
	if err != nil {
		return fmt.Errorf("stat %s: %w", target, err)
	}

	if !info.IsDir() {
		state[target] = fileSignature{ModTime: info.ModTime().UnixNano(), Size: info.Size()}
		return nil
	}

	return filepath.WalkDir(target, func(path string, entry fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if entry.IsDir() {
			return nil
		}

		info, err := entry.Info()
		if err != nil {
			return err
		}

		state[path] = fileSignature{ModTime: info.ModTime().UnixNano(), Size: info.Size()}
		return nil
	})
}

func snapshotsEqual(left, right fileSnapshot) bool {
	if len(left) != len(right) {
		return false
	}

	for path, leftSignature := range left {
		rightSignature, ok := right[path]
		if !ok || leftSignature != rightSignature {
			return false
		}
	}

	return true
}
