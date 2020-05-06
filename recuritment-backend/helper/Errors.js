"use strict";
var errors = {
	"invalid_parameters" 										: [100, "Invalid Parameters"],
	"server_error"		 										: [500, "Something went wrong"],
	"no_server_response"										: [2300,"No response from server"],
	"invalid_email"												: [101, "Invalid Email Id"],
	"user_already_exists"										: [102, "User email already exists"],
};

module.exports = errors; 