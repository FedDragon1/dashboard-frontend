import {currentDate, emptyList, emptyString, EntityHandler, IMMUTABLE, MUTABLE} from "@/utils/usePostFetch";
import useUuid from "@/utils/useUuid";


const instructorHandler = new EntityHandler({
    uuid: {
        type: IMMUTABLE,
        default: useUuid
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
        default: useUuid
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
        default: useUuid
    },
    name: {
        type: MUTABLE,
        default: emptyString
    },
    created: {
        type: MUTABLE,
        default: currentDate
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
        default: useUuid
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

const attendanceHandler = new EntityHandler({
    uuid: {
        type: IMMUTABLE,
        default: useUuid
    },
    date: {
        type: MUTABLE,
        default: currentDate
    },
    courseUuid: {
        type: MUTABLE,
        default: emptyString
    },
    records: {
        type: IMMUTABLE,
        default: emptyList,
        exist: false
    }
})

export function useAttendance() {
    return attendanceHandler;
}

const attendanceRecordHandler = new EntityHandler({
    id: {
        type: IMMUTABLE,
        default: () => Math.floor(Math.random() * 100_000_000),
    },
    studentUuid: {
        type: MUTABLE,
        default: emptyString
    },
    attendanceUuid: {
        type: MUTABLE,
        default: emptyString
    }
})

export function useAttendanceRecord() {
    return attendanceRecordHandler;
}
