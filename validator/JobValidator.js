module.exports.isValidRole = function (role) {
    if (role.getName == "" || role.getDescription == "" || role.getSpecification == "" || role.getResponsibilities == "") {
        return "All fields must have a value";
    }

    if (role.getName.length > 50) {
        return "Name too long"
    }

    if (role.getDescription.length > 500) {
        return "Description too long";
    }

    if (role.getSpecification.length > 255) {
        return "Speficiation too long";
    }

    if (role.getResponsibilities.length > 500) {
        return "Responsibilities too long";
    }

    return null
}