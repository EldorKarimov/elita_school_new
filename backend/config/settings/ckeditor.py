CKEDITOR_5_UPLOADS_FOLDER = 'ckeditor/'

# Rang palitralari — jadval va hujayra ranglarini tanlash uchun
TABLE_COLOR_PALETTE = [
    {'color': '#ffffff', 'label': 'White'},
    {'color': '#f8faff', 'label': 'Light Blue'},
    {'color': '#eef2fb', 'label': 'Sky'},
    {'color': '#e5e7eb', 'label': 'Gray 200'},
    {'color': '#f9fafb', 'label': 'Gray 50'},
    {'color': '#dbeafe', 'label': 'Blue 100'},
    {'color': '#bfdbfe', 'label': 'Blue 200'},
    {'color': '#274c8f', 'label': 'Brand Blue'},
    {'color': '#1e3a6e', 'label': 'Dark Blue'},
    {'color': '#1e40af', 'label': 'Blue 800'},
    {'color': '#111827', 'label': 'Gray 900'},
    {'color': '#374151', 'label': 'Gray 700'},
    {'color': '#6b7280', 'label': 'Gray 500'},
    {'color': '#fef9c3', 'label': 'Yellow 100'},
    {'color': '#dcfce7', 'label': 'Green 100'},
    {'color': '#fee2e2', 'label': 'Red 100'},
]

CKEDITOR_5_CONFIGS = {
    'default': {
        'toolbar': ['heading', '|', 'bold', 'italic', 'link',
                    'bulletedList', 'numberedList', 'blockQuote', 'imageUpload'],
    },
    'extends': {
        'blockToolbar': [
            'paragraph', 'heading1', 'heading2', 'heading3',
            '|',
            'bulletedList', 'numberedList',
            '|',
            'blockQuote', 'imageUpload',
        ],
        'toolbar': [
            'heading', '|',
            'outdent', 'indent', '|',
            'bold', 'italic', 'underline', 'strikethrough', 'code', '|',
            'alignment', '|',
            'fontColor', 'fontBackgroundColor', 'fontSize', 'fontFamily', '|',
            'link', 'insertImage', 'mediaEmbed', '|',
            'bulletedList', 'numberedList', 'todoList', '|',
            'blockQuote', 'insertTable', '|',
            'sourceEditing', 'removeFormat',
        ],
        'alignment': {
            'options': ['left', 'center', 'right', 'justify'],
        },
        'fontSize': {
            'options': [10, 11, 12, 'default', 14, 16, 18, 20, 24, 28, 32, 36],
        },
        'image': {
            'toolbar': [
                'imageTextAlternative', '|',
                'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight', 'imageStyle:side',
            ],
            'styles': ['full', 'side', 'alignLeft', 'alignRight', 'alignCenter'],
        },
        'table': {
            'contentToolbar': [
                'tableColumn', 'tableRow', 'mergeTableCells',
                '|',
                'tableProperties', 'tableCellProperties',
            ],
            'tableProperties': {
                'borderColors': TABLE_COLOR_PALETTE,
                'backgroundColors': TABLE_COLOR_PALETTE,
                'defaultProperties': {
                    'borderStyle': 'solid',
                    'borderColor': '#e5e7eb',
                    'borderWidth': '1px',
                },
            },
            'tableCellProperties': {
                'borderColors': TABLE_COLOR_PALETTE,
                'backgroundColors': TABLE_COLOR_PALETTE,
                'defaultProperties': {
                    'borderStyle': 'solid',
                    'borderColor': '#e5e7eb',
                    'borderWidth': '1px',
                    'padding': '11px 18px',
                },
            },
        },
        'heading': {
            'options': [
                {'model': 'paragraph', 'title': 'Paragraph', 'class': 'ck-heading_paragraph'},
                {'model': 'heading1', 'view': 'h1', 'title': 'Heading 1', 'class': 'ck-heading_heading1'},
                {'model': 'heading2', 'view': 'h2', 'title': 'Heading 2', 'class': 'ck-heading_heading2'},
                {'model': 'heading3', 'view': 'h3', 'title': 'Heading 3', 'class': 'ck-heading_heading3'},
                {'model': 'heading4', 'view': 'h4', 'title': 'Heading 4', 'class': 'ck-heading_heading4'},
            ],
        },
    },
}