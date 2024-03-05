import axios from "axios";
import {ElMessage} from "element-plus";
import Qs from "qs";

export async function useGet(getApi, postProcessing) {
    try {
        const resp = await axios.get(getApi);
        if (!resp.data.success) {
            ElMessage.error(resp.data.error);
        } else if (postProcessing) {
            postProcessing(resp);
        }
        return resp.data;
    } catch (e) {
        ElMessage.error(e);
    }
}

function handleAxios(api, method, data, successMsg, postProcessing, finallyFn) {
    const a = axios[method](api, Qs.stringify(data))
        .then(r => {
            if (r.data.success === false) {
                ElMessage.error(r.data.error);
                return;
            } else if (postProcessing) {
                postProcessing();
            }
            ElMessage.success(successMsg);
        })
        .catch(ElMessage.error)

    if (finallyFn) {
        a.finally(finallyFn);
    }
}

export function usePost(postApi, dataRef, successMsg, postProcessing, finallyFn) {
    handleAxios(postApi, "post", dataRef, successMsg, postProcessing, finallyFn);
}

export function usePut(putApi, dataRef, successMsg, postProcessing, finallyFn) {
    handleAxios(putApi, "put", dataRef, successMsg, postProcessing, finallyFn);
}

export function useDelete(deleteApi, dataRef, successMsg, postProcessing, finallyFn) {
    const a = axios.delete(deleteApi, {params: dataRef})
        .then((r) => {
            if (r.data.success === false) {
                ElMessage.error(r.data.error);
                return
            } else if (postProcessing) {
                postProcessing();
            }
            ElMessage.success(successMsg);
        })
        .catch(ElMessage.error)

    if (finallyFn) {
        a.finally(finallyFn);
    }
}