"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        const searchTerm = this.query.searchTerm || this.query.name;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const exclude = ["searchTerm", "sort", "limit", "page"];
        exclude.forEach((el) => delete queryObj[el]);
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        var _a;
        const sort = ((_a = this.query.sort) === null || _a === void 0 ? void 0 : _a.split(",").join(" ")) || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    paginate() {
        var _a, _b;
        const limit = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.limit) || 5;
        const page = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
}
exports.QueryBuilder = QueryBuilder;
