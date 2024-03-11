import {ElMessage} from "element-plus";
import {reactive, ref} from "vue";
import {useDelete, usePost, usePut} from "@/utils/useAxios";

function generatePostFetch(...updating) {
    return (resp) => {
        if (!Array.isArray(resp.data.data)) {
            resp.data.data = [resp.data.data];
        }

        for (const obj of resp.data.data) {
            obj.updating = {}
            for (const attr of updating) {
                obj.updating[attr] = obj[attr];
            }
            obj.editable = false;
        }
    }
}

function generateEntitilizer(...attrs) {
    return (obj) => {
        const ret = {};
        for (const attr of attrs) {
            if (obj[attr] === undefined || obj[attr] === null) {
                continue;
            }
            if (obj.updating[attr] !== undefined) {
                ret[attr] = obj.updating[attr]
            } else {
                ret[attr] = obj[attr];
            }
        }
        return ret;
    }
}

function generateDiff(...attrs) {
    return (scope, message, type) => {
        let same = true;
        for (const attr of attrs) {
            if (scope.row[attr] !== scope.row.updating[attr]) {
                same = false;
                break;
            }
        }

        if (same) {
            ElMessage({message, type})
            return false;
        }

        return true;
    }
}

function generateUpdate(...attrs) {
    return (scope) => {
        console.log("update")
        for (const attr of attrs) {
            scope.row[attr] = scope.row.updating[attr];
        }
    }
}

function generateRevert(...attrs) {
    return (scope) => {
        for (const attr of attrs) {
            scope.row.updating[attr] = scope.row[attr];
        }
    }
}

function deleteLocalByUuid(uuid, data) {
    for (var i = 0; i < data.value.data.length; i++) {
        if (data.value.data[i].uuid === uuid) {
            break;
        }
    }
    data.value.data.splice(i, 1);
}

function notEmpty(scope, message, type) {
    if (Object.values(scope.row.updating).reduce((a, b) => a && b)) {
        return true;
    }
    ElMessage({message, type});
    return false
}

export const MUTABLE = 0;
export const IMMUTABLE = 1;
export const emptyString = () => '';
export const emptyList = () => [];

export class EntityHandler {
    constructor(config) {
        this.config = config;

        this.attrs = Object.keys(this.config);
        this.mutableAttrs = this.attrs.filter((key) => this.config[key].type === MUTABLE)
        this.tableAttrs = this.attrs.filter(key => this.config[key]?.exist !== false)

        this.getEntity = generateEntitilizer(...this.tableAttrs);
        this.diff = generateDiff(...this.mutableAttrs);
        this.update = generateUpdate(...this.mutableAttrs);
        this.revert = generateRevert(...this.mutableAttrs)

        this.postFetch = generatePostFetch(...this.mutableAttrs);
        this.getOperations = this.#generateOp();
        this.tempObject = ref(null);
    }

    #generateOp() {
        return (api, data, router, detailUriSupplier) => reactive({
            handleNew: () => {
              const newTemp = {
                  editable: true,
                  temp: true
              };
              const updating = {};
              for (let [attr, {type, default: value}] of Object.entries(this.config)) {
                  switch (type) {
                      case MUTABLE:
                          updating[attr] = value();
                          // fallthrough
                      case IMMUTABLE:
                          newTemp[attr] = value();
                          break
                      default:
                          throw Error("Attribute not mutable or immutable");
                  }
              }
              newTemp.updating = updating;
              this.tempObject.value = newTemp;
              return this.tempObject.value;
            },
            handleCreate: (scope) => {
                if (!notEmpty(scope, "Fields are Empty", "error")
                    || !this.diff(scope, "Fields are Empty", "error")) {
                    return;
                }

                const entity = this.getEntity(scope.row);
                usePost(api, entity, `Created ${entity.uuid}`, () => {
                    delete this.tempObject.value.temp;
                    scope.row.editable = false;
                    this.tempObject.value = null;
                    this.update(scope);
                }, undefined,
                    () => this.revert(scope))
            },
            handleDetail: (scope) => {
                router.push(detailUriSupplier(scope))
            },
            handleSave: (scope) => {
                if (!notEmpty(scope, "Fields are Empty", "error")) {
                    return;
                }

                if (!this.diff(scope, "No Change Made", "warning")) {
                    scope.row.editable = false;
                    return;
                }

                const updated = this.getEntity(scope.row);
                usePut(
                    api, updated,
                    `Updated ${scope.row.uuid}`,
                    () => this.update(scope),
                    () => scope.row.editable = false,
                    () => this.revert(scope)
                );
            },
            handleCancelCreate: () => {
                if (this.tempObject.value === null) {
                    ElMessage.error("Nothing to Delete")
                }
                data.value.data.pop();
                this.tempObject.value = null;
            },
            handleDelete: (scope) => {
                const entity = this.getEntity(scope.row);
                useDelete(
                    api, entity,
                    `Deleted ${entity.uuid}`,
                    () => {
                        deleteLocalByUuid(entity.uuid, data);
                        this.update(scope);
                    },
                    () => this.revert(scope)
                );
            },
            handleCancel: (scope) => {
                for (const attr of this.mutableAttrs) {
                    scope.row.updating[attr] = scope.row[attr];
                }
                scope.row.editable = false;
            }
        })
    }

}