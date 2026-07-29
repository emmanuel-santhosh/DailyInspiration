import {createContext} from "react";
import type {userType} from "../types/User.ts";

export const UserContext = createContext<userType>(undefined);