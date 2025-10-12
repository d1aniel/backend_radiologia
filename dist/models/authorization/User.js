"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class User extends sequelize_1.Model {
    checkPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compare(password, this.password);
        });
    }
    generateToken() {
        return jsonwebtoken_1.default.sign({ id: this.id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "10m",
        });
    }
    generateRefreshToken() {
        // const expiresIn = '24H';
        const expiresIn = "5m";
        const token = jsonwebtoken_1.default.sign({ id: this.id }, process.env.JWT_SECRET || "secret", {
            expiresIn,
        });
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 1 minutos
        // const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
        return { token, expiresAt };
    }
}
exports.User = User;
User.init({
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "users",
    sequelize: connection_1.default,
    timestamps: false,
    hooks: {
        beforeCreate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.password) {
                const salt = yield bcryptjs_1.default.genSalt(10);
                user.password = yield bcryptjs_1.default.hash(user.password, salt);
            }
        }),
        beforeUpdate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.password) {
                const salt = yield bcryptjs_1.default.genSalt(10);
                user.password = yield bcryptjs_1.default.hash(user.password, salt);
            }
        })
    }
});
//# sourceMappingURL=User.js.map