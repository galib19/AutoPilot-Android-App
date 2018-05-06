import StatusConstant from '../constants/StatusConstant';
import color from '../constants/Color';

export function getStatusColor(colorName) {
    let colorNameLowerCase = colorName.toLowerCase();
    if (colorNameLowerCase === StatusConstant.NEW.toLowerCase()) {
        return color.NEW_STATUS_COLOR;
    } else if (colorNameLowerCase === StatusConstant.REVIEWED.toLowerCase()) {
        return color.REVIEW_STATUS_COLOR;
    } else if (colorNameLowerCase === StatusConstant.OPEN.toLowerCase()) {
        return color.OPEN_STATUS_COLOR;
    } else if (colorNameLowerCase === StatusConstant.APPROVED.toLowerCase()) {
        return color.APPROVED_STATUS_COLOR;
    } else if (colorNameLowerCase === StatusConstant.ARCHIVED.toLowerCase()) {
        return color.ARCHIVED_STATUS_COLOR;
    } else {
        return color.CLOSE_STATUS_COLOR;
    }
}