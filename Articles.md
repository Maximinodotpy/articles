---

database-plugin: basic

---

```yaml:dbfolder
name: new database
description: new description
columns:
  __file__:
    key: __file__
    id: __file__
    input: markdown
    label: File
    accessorKey: __file__
    isMetadata: true
    skipPersist: false
    isDragDisabled: false
    csvCandidate: true
    position: 1
    isHidden: false
    sortIndex: 1
    width: 63
    isSorted: true
    isSortedDesc: false
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  name:
    input: text
    accessorKey: name
    key: name
    id: name
    label: name
    position: 2
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 258
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
      content_alignment: text-align-left
  category:
    input: select
    accessorKey: category
    key: category
    id: category
    label: category
    position: 3
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 166
    options:
      - { label: "Project", value: "Project", color: "hsl(116, 95%, 90%)"}
      - { label: "Utility", value: "Utility", color: "hsl(114, 95%, 90%)"}
      - { label: "General", value: "General", color: "hsl(328, 95%, 90%)"}
      - { label: "Godot Game Engine", value: "Godot Game Engine", color: "hsl(153, 95%, 90%)"}
      - { label: "Webdevelopment", value: "Webdevelopment", color: "hsl(312, 95%, 90%)"}
      - { label: "general", value: "general", color: "hsl(49, 95%, 90%)"}
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
      content_alignment: text-align-left
      option_source: manual
  tags:
    input: tags
    accessorKey: tags
    key: tags
    id: tags
    label: tags
    position: 100
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 386
    options:
      - { label: "Web API's", value: "Web API's", color: "hsl(63, 95%, 90%)"}
      - { label: "JavaScript", value: "JavaScript", color: "hsl(313, 95%, 90%)"}
      - { label: "HTML", value: "HTML", color: "hsl(231, 95%, 90%)"}
      - { label: "CSS", value: "CSS", color: "hsl(164, 95%, 90%)"}
      - { label: "VueJS", value: "VueJS", color: "hsl(75, 95%, 90%)"}
      - { label: "SASS", value: "SASS", color: "hsl(57, 95%, 90%)"}
      - { label: "Typescript", value: "Typescript", color: "hsl(239, 95%, 90%)"}
      - { label: "GD Script", value: "GD Script", color: "hsl(139, 95%, 90%)"}
      - { label: "Component", value: "Component", color: "hsl(28, 95%, 90%)"}
      - { label: "Svelte", value: "Svelte", color: "hsl(42, 95%, 90%)"}
      - { label: "Game", value: "Game", color: "hsl(149, 95%, 90%)"}
      - { label: "Concept", value: "Concept", color: "hsl(36, 95%, 90%)"}
      - { label: "SCSS", value: "SCSS", color: "hsl(155, 95%, 90%)"}
      - { label: "Python", value: "Python", color: "hsl(148, 95%, 90%)"}
      - { label: "Markdown", value: "Markdown", color: "hsl(330, 95%, 90%)"}
      - { label: "PHP", value: "PHP", color: "hsl(294, 95%, 90%)"}
      - { label: "Development", value: "Development", color: "hsl(9, 95%, 90%)"}
      - { label: "Dev Story", value: "Dev Story", color: "hsl(95, 95%, 90%)"}
      - { label: "Shortcuts", value: "Shortcuts", color: "hsl(310, 95%, 90%)"}
      - { label: "SVG", value: "SVG", color: "hsl(281, 95%, 90%)"}
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
      content_alignment: text-align-left
      option_source: manual
  description:
    input: text
    accessorKey: description
    key: description
    id: description
    label: description
    position: 100
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 454
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
      wrap_content: true
      content_alignment: text-align-left
  status:
    input: select
    accessorKey: status
    key: status
    id: status
    label: status
    position: 100
    skipPersist: false
    isHidden: false
    sortIndex: -1
    options:
      - { label: "Publish", value: "publish", color: "hsl(192, 95%, 90%)"}
      - { label: "Draft", value: "draft", color: "hsl(321, 95%, 90%)"}
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
config:
  remove_field_when_delete_column: false
  cell_size: normal
  sticky_first_column: false
  group_folder_column: 
  remove_empty_folders: false
  automatically_group_files: false
  hoist_files_with_empty_attributes: true
  show_metadata_created: false
  show_metadata_modified: false
  show_metadata_tasks: false
  show_metadata_inlinks: false
  show_metadata_outlinks: false
  show_metadata_tags: false
  source_data: current_folder
  source_form_result: 
  source_destination_path: /
  row_templates_folder: /
  current_row_template: 
  pagination_size: 200
  font_size: 16
  enable_js_formulas: false
  formula_folder_path: /
  inline_default: false
  inline_new_position: last_field
  date_format: yyyy-MM-dd
  datetime_format: "yyyy-MM-dd HH:mm:ss"
  metadata_date_format: "yyyy-MM-dd HH:mm:ss"
  enable_footer: false
  implementation: default
filters:
  enabled: false
  conditions:
```