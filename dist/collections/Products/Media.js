"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
// This function is designed to determine if a user is an admin or has access to images based on their role.
var isAdminOrHasAccessToImages = function () {
    return function (_a) {
        var req = _a.req;
        return __awaiter(void 0, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                user = req.user;
                // It first extracts the user object from the request, casting it to the User type or undefined.
                if (!user)
                    return [2 /*return*/, false
                        // If there is no user (!user), meaning the user is not authenticated, it returns false, indicating no access.
                    ];
                // If there is no user (!user), meaning the user is not authenticated, it returns false, indicating no access.
                if (user.role === 'admin')
                    return [2 /*return*/, true
                        // If the user is an admin (user.role === 'admin'), it returns true, granting full access.
                        // console.log('req.user.id', req.user.id)
                    ];
                // If the user is an admin (user.role === 'admin'), it returns true, granting full access.
                // console.log('req.user.id', req.user.id)
                return [2 /*return*/, {
                        user: {
                            equals: req.user.id,
                        },
                    }
                    // This object is returned when the user is authenticated but is not an admin. It specifies an access control condition based on the ID of the user making the request.
                ];
            });
        });
    };
};
exports.Media = {
    slug: 'media',
    hooks: {
        beforeChange: [
            function (_a) {
                var req = _a.req, data = _a.data;
                return __assign(__assign({}, data), { user: req.user.id });
            },
        ],
    },
    //   beforeChange Hook: This hook is executed just before the data is about to be changed, such as before creating or updating a document in the collection.
    //   data: This object represents the data about to be changed. It could be the data for a new document being created or the updated data for an existing document.
    //   Return Value: The function returns a new object that includes all properties from the data object along with an added user property, which contains the ID of the user making the request. This modified data object will then be used for the subsequent operation, whether it's creating or updating a document.
    //   Usage Example: Suppose a user submits a request to create or update a document in the Media collection. This hook will intercept that request just before the change is made, extract the ID of the user making the request from req.user.id, and add it to the data object before the change is processed.
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== 'admin';
        },
    },
    access: {
        read: function (_a) {
            var req = _a.req;
            return __awaiter(void 0, void 0, void 0, function () {
                var referer;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            referer = req.headers.referer;
                            if (!req.user || !(referer === null || referer === void 0 ? void 0 : referer.includes('sell'))) {
                                // if the user is not logged in ie !req.user they should see all images in the frontend
                                // if the user is logged in and they are not in the backend dashboard ie /sell they should see all the images in the FE
                                return [2 /*return*/, true];
                            }
                            return [4 /*yield*/, isAdminOrHasAccessToImages()({ req: req })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        delete: isAdminOrHasAccessToImages(),
        update: isAdminOrHasAccessToImages(),
    },
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'tablet',
                width: 1024,
                height: undefined,
                position: 'centre',
            },
        ],
        mimeTypes: ['image/*'],
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: {
                condition: function () { return false; },
            },
        },
    ],
};
