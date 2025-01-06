-- Resume templates table
CREATE TABLE IF NOT EXISTS resume_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Resumes table
CREATE TABLE IF NOT EXISTS resumes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_id INTEGER,
    title TEXT NOT NULL,
    personal_info JSON,
    experience JSON,
    education JSON,
    skills JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES resume_templates(id)
);

-- Insert default templates
INSERT INTO resume_templates (name, description, thumbnail_url) VALUES
('Professional', 'Um modelo profissional e moderno, ideal para destacar suas habilidades e experiências.', '/templates/professional.png'),
('Creative', 'Um design criativo e único, perfeito para profissionais de áreas criativas.', '/templates/creative.png'),
('Minimal', 'Um layout limpo e minimalista, focado em clareza e objetividade.', '/templates/minimal.png');
