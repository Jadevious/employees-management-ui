module.exports.isValidRole = function (role) {
    if (role.getName == "" || role.getDescription == "" || role.getSpecification == "" || role.getResponsibilities == "") {
        return "All fields must have a value";
    }

    return null
}