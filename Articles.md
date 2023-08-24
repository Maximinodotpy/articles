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
    position: 0
    isHidden: false
    sortIndex: 1
    width: 189
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
    position: 100
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 442
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
    width: 289
    options:
      - { label: "gdscript,godot,editor,ui", value: "gdscript,godot,editor,ui", color: "hsl(303, 95%, 90%)"}
      - { label: "JavaScript,Typescript", value: "JavaScript,Typescript", color: "hsl(143, 95%, 90%)"}
      - { label: "svelte,custom-svelte-stores,web_apis,user_interface", value: "svelte,custom-svelte-stores,web_apis,user_interface", color: "hsl(310, 95%, 90%)"}
      - { label: "JavaScript,Typescript,Animations", value: "JavaScript,Typescript,Animations", color: "hsl(163, 95%, 90%)"}
      - { label: "shortcuts", value: "shortcuts", color: "hsl(330, 95%, 90%)"}
      - { label: "JavaScript,Web Development,File System Access API", value: "JavaScript,Web Development,File System Access API", color: "hsl(211, 95%, 90%)"}
      - { label: "gdscript", value: "gdscript", color: "hsl(31, 95%, 90%)"}
      - { label: "godot", value: "godot", color: "hsl(248, 95%, 90%)"}
      - { label: "editor", value: "editor", color: "hsl(131, 95%, 90%)"}
      - { label: "ui", value: "ui", color: "hsl(247, 95%, 90%)"}
      - { label: "JavaScript", value: "JavaScript", color: "hsl(170, 95%, 90%)"}
      - { label: "Typescript", value: "Typescript", color: "hsl(355, 95%, 90%)"}
      - { label: "svelte", value: "svelte", color: "hsl(65, 95%, 90%)"}
      - { label: "custom-svelte-stores", value: "custom-svelte-stores", color: "hsl(221, 95%, 90%)"}
      - { label: "web_apis", value: "web_apis", color: "hsl(334, 95%, 90%)"}
      - { label: "user_interface", value: "user_interface", color: "hsl(149, 95%, 90%)"}
      - { label: "Animations", value: "Animations", color: "hsl(198, 95%, 90%)"}
      - { label: "Web Development", value: "Web Development", color: "hsl(220, 95%, 90%)"}
      - { label: "File System Access API", value: "File System Access API", color: "hsl(345, 95%, 90%)"}
      - { label: "HTML", value: "HTML", color: "hsl(132, 95%, 90%)"}
      - { label: "CSS", value: "CSS", color: "hsl(95, 95%, 90%)"}
      - { label: "VueJS", value: "VueJS", color: "hsl(315, 95%, 90%)"}
      - { label: "Web API's", value: "Web API's", color: "hsl(202, 95%, 90%)"}
      - { label: "SASS", value: "SASS", color: "hsl(349, 95%, 90%)"}
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
      option_source: manual
      content_alignment: text-align-left
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