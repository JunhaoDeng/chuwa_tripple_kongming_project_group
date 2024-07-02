"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert_nonnull_prop = insert_nonnull_prop;
function insert_nonnull_prop(obj, prop_name, prop_val) {
    if (prop_val !== null) {
        obj[prop_name] = prop_val;
    }
}
