import {emptyList, emptyString, EntityHandler, IMMUTABLE, MUTABLE} from "@/utils/usePostFetch";
import useUuid from "@/utils/useUuid";


const instructorHandler = new EntityHandler({
    uuid: {
        type: IMMUTABLE,
        default: () => useUuid()
    },
    name: {
        type: MUTABLE,
        default: emptyString
    },
    password: {
        type: MUTABLE,
        default: emptyString
    },
    courses: {
        type: IMMUTABLE,
        default: emptyList,
        exist: false
    }
});

export function useInstructor() {
    return instructorHandler;
}

const studentHandler = new EntityHandler({
    uuid: {
        type: IMMUTABLE,
        default: () => useUuid()
    },
    name: {
        type: MUTABLE,
        default: emptyString
    },
    gender: {
        type: MUTABLE,
        default: emptyString
    },
    birthday: {
        type: MUTABLE,
        default: () => '2000-02-29'
    },
    courses: {
        type: IMMUTABLE,
        default: emptyList,
        exist: false
    }
});

export function useStudent() {
    return studentHandler;
}

const courseHandler = new EntityHandler({
    uuid: {
        type: IMMUTABLE,
        default: () => useUuid()
    },
    name: {
        type: MUTABLE,
        default: emptyString
    },
    created: {
        type: MUTABLE,
        default: () => new Date().toJSON().slice(0, 10)
    },
    instructorUuid: {
        type: MUTABLE,
        default: emptyString
    }
});

export function useCourse() {
    return courseHandler;
}

const courseMemberHandler = new EntityHandler({
    courseUuid: {
        type: IMMUTABLE,
        default: () => useUuid()
    },
    courseName: {
        type: IMMUTABLE,
        default: emptyString,
        exist: false
    },
    grade: {
        type: MUTABLE,
        default: () => 0
    },
    studentUuid: {
        type: IMMUTABLE,
        default: emptyString
    }
});

export function useCourseMember() {
    return courseMemberHandler;
}
