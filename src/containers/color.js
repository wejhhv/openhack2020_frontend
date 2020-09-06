export const convertIDtoContentColor = (emotionID)=> {
    return convertIDtoColor(emotionID, 0.3);
};

export const convertIDtoBorderColor = (emotionID)=> {
    return convertIDtoColor(emotionID, 1);
};

function convertIDtoColor(emotionID, opacity) {
    if(0 <= emotionID && emotionID <= 2) {
        return "rgba(255,102,255,"+opacity+")";
    } else if(3 <= emotionID && emotionID <= 5) {
        return "rgba(255,51,51,"+opacity+")";
    } else if(6 <= emotionID && emotionID <= 8) {
        return "rgba(153,153,255,"+opacity+")";
    } else {
        return "rgba(204,204,51,"+opacity+")";
    }
};