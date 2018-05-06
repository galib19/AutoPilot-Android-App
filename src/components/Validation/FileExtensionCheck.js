export function checkFileExtension(fileName) {
    let extension = fileName.substr(fileName.lastIndexOf('.') + 1);
    let supportedExtension = ["txt", "xls", "xlsx", "pptx", "ppt", "doc", "docx", "jpeg", "jpg", "png", "pdf", "pps", "ppsx", "pot", "potx", "zip", "rar", "7zip", "mp4", "avi", "mkv", "flv", "wmv", "mov", "mp3"];
    for (i = 0; i < supportedExtension.length; i++) {
        if (extension === supportedExtension[i]) {
            return true
        }
    }
    return false;
}