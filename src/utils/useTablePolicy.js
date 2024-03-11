import {reactive} from "vue";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function useTablePolicy(...attrs) {
    const ret = {};
    for (const attr of attrs) {
        ret[`hide${capitalizeFirstLetter(attr)}`] = false;
        ret[`editable${capitalizeFirstLetter(attr)}`] = false;
    }
    return ret;
}

export function useCourseTablePolicy(updating) {
    return reactive({
        ...useTablePolicy("uuid", "name", "dateCreated", "instructorUuid"),
        ...updating
    });
}

export function useStudentTablePolicy(updating) {
    return reactive({
        ...useTablePolicy("uuid", "name", "gender", "birthday", "courses"),
        ...updating
    });
}
