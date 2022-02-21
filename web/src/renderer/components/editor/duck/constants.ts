import SetOptions from 'suneditor-react/dist/types/SetOptions';

export const OPTIONS: SetOptions = {
  resizingBar: false,
  buttonList: [
    ['font', 'fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['removeFormat'],
    ['fontColor', 'hiliteColor'],
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'table'],
    ['link', 'image', 'video'],
    ['fullScreen', 'showBlocks', 'codeView'],
    ['preview', 'print'],
    ['save' /* 'template' */],
  ],
  fontSize: [10, 12, 14, 16, 18, 20, 22],
  defaultStyle: 'font-size: 14px; font-family: Arial;',
};
