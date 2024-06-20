export function insert_nonnull_prop(obj: any, prop_name: string, prop_val: any) {
    if (prop_val !== null) {
        obj[prop_name] = prop_val;
    }
}