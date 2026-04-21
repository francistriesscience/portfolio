package notes

type Frontmatter struct {
	Title       string   `yaml:"title" json:"title"`
	Description string   `yaml:"description" json:"description"`
	Date        string   `yaml:"date" json:"date"`
	Updated     string   `yaml:"updated,omitempty" json:"updated,omitempty"`
	Tags        []string `yaml:"tags" json:"tags"`
	Draft       bool     `yaml:"draft" json:"draft"`
	Image       string   `yaml:"image,omitempty" json:"image,omitempty"`
	Og          string   `yaml:"og,omitempty" json:"og,omitempty"`
}

type File struct {
	Slug        string
	Frontmatter Frontmatter
	Source      string
}

type GeneratedRecord struct {
	Slug        string      `json:"slug"`
	Frontmatter Frontmatter `json:"frontmatter"`
	Source      string      `json:"source"`
}
