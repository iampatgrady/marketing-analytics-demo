#!/bin/bash

files=(
  "Dockerfile"
  "LICENSE"
  "README.md"
  "eslint.config.mjs"
  "jsconfig.json"
  "next.config.mjs"
  "package.json"
  "postcss.config.mjs"
  "src/app/durable-measurement/page.js"
  "src/app/geo-lift-studies/page.js"
  "src/app/globals.css"
  "src/app/layout-server.js"
  "src/app/layout.js"
  "src/app/machine-learning-modeling/page.js"
  "src/app/mta-mmm-attribution/page.js"
  "src/app/page.js"
  "src/app/value-based-bidding/page.js"
  "src/components/Navigation.jsx"
  "tailwind.config.mjs"
)

output_file="project_files.txt"

> "$output_file"  # Clear the output file if it exists

# Add tree output with structured delimiter
echo "--- START_DIRECTORY_STRUCTURE ---" >> "$output_file"
tree -I "node_modules|.next" >> "$output_file"
echo "--- END_DIRECTORY_STRUCTURE ---" >> "$output_file"

# Loop through files with structured delimiters
for file in "${files[@]}"; do
  echo "--- START_FILE: $file ---" >> "$output_file"
    if [ -f "$file" ]; then
      cat "$file" >> "$output_file"
    else
      echo "File not found: $file" >> "$output_file"
    fi
  echo "--- END_FILE: $file ---" >> "$output_file"
done

echo "File contents saved to $output_file"