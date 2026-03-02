import { useState } from "react";
import { FormattedMessage } from "react-intl";

export function useFinancialOperationsFilter () {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courseValue, setCourseValue] = useState({ value: '', label: <FormattedMessage id="all" /> });
    const [pathId, setPathId] = useState('');
    const [pathValue, setPathValue] = useState({ value: '', label: <FormattedMessage id="all" /> });
    const [teacherId, setTeacherId] = useState('');
    const [teacherValue, setTeacherValue] = useState({ value: '', label: <FormattedMessage id="all" /> });

    return {
        from, setFrom, to, setTo, courseId, setCourseId, courseValue, setCourseValue, pathId, setPathId, pathValue, setPathValue,
        teacherId, setTeacherId, teacherValue, setTeacherValue,
    };
}