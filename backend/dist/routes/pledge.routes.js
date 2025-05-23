"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pledgeController = __importStar(require("../controllers/pledge.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const types_1 = require("../types");
const router = (0, express_1.Router)();
// Get all pledges
router.get('/', auth_middleware_1.authenticate, pledgeController.getAllPledges);
// Get current user's pledges - specific routes must come BEFORE parameterized routes
router.get('/my-pledges', auth_middleware_1.authenticate, pledgeController.getMyPledges);
// Get pledges by member ID
router.get('/member/:userId', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(types_1.UserRole.ADMIN, types_1.UserRole.ADMIN_LEVEL_1, types_1.UserRole.ADMIN_LEVEL_2, types_1.UserRole.SUPER_ADMIN), pledgeController.getPledgesByUserId);
// Create new pledge
router.post('/', auth_middleware_1.authenticate, pledgeController.createPledge);
// The following routes have URL parameters and should come AFTER specific routes
// Update pledge
router.put('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(types_1.UserRole.ADMIN, types_1.UserRole.ADMIN_LEVEL_1, types_1.UserRole.ADMIN_LEVEL_2, types_1.UserRole.SUPER_ADMIN), pledgeController.updatePledge);
// Delete pledge
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(types_1.UserRole.ADMIN, types_1.UserRole.ADMIN_LEVEL_1, types_1.UserRole.ADMIN_LEVEL_2, types_1.UserRole.SUPER_ADMIN), pledgeController.deletePledge);
// Get pledge by ID - parameterized route should come AFTER specific routes
router.get('/:id', auth_middleware_1.authenticate, pledgeController.getPledgeById);
exports.default = router;
