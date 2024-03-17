import webUserSchema from "../schema/webUserSchema.js";

export let createWebUserService = async (data) => {
    return await webUserSchema.create(data);
  };