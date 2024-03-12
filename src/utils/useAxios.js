import axios from "axios";
import {ElMessage} from "element-plus";
import Qs from "qs";

axios.defaults.baseURL = "http://localhost:8080/api"
axios.defaults.withCredentials = true;

export default axios;

export async function useGet(getApi, postProcessing, onError) {
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
        onError && onError(e);
    }
}

function handleAxios(api, method, data, successMsg, postProcessing, finallyFn, onError) {
    const a = axios[method](api, Qs.stringify(data))
        .then(r => {
            if (r.data.success === false) {
                ElMessage.error(r.data.error);
                return;
            } else if (postProcessing) {
                postProcessing(r);
            }
            ElMessage.success(successMsg);
        })
        .catch(e => {
            ElMessage.error(e);
            onError && onError(e);
        })

    if (finallyFn) {
        a.finally(finallyFn);
    }
}

export function usePost(postApi, dataRef, successMsg, postProcessing, finallyFn, onError) {
    handleAxios(postApi, "post", dataRef, successMsg, postProcessing, finallyFn, onError);
}

export function usePut(putApi, dataRef, successMsg, postProcessing, finallyFn, onError) {
    handleAxios(putApi, "put", dataRef, successMsg, postProcessing, finallyFn, onError);
}

export function useDelete(deleteApi, dataRef, successMsg, postProcessing, finallyFn, onError) {
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
        .catch(e => {
            ElMessage.error(e);
            onError && onError(e);
        })

    if (finallyFn) {
        a.finally(finallyFn);
    }
}