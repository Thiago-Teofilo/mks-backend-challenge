import { BadRequestException } from "@nestjs/common";

export default function validatePassword(password) {
	// Verifica se a senha tem mais de 5 caracteres
	if (password.length < 5) {
		throw new BadRequestException("The entered password does not contain minimum of 5 characters");
	}

	// Verifica se a senha tem pelo menos um caractere maiúsculo
	const hasUppercase = /[A-Z]/.test(password);
	if (!hasUppercase) {
		throw new BadRequestException("The entered password does not contain uppercase characters");
	}

	// Verifica se a senha tem pelo menos um dígito numérico
	const hasNumber = /[0-9]/.test(password);
	if (!hasNumber) {
		throw new BadRequestException("The entered password does not contain numbers");
	}

	// Verifica se a senha não contém símbolos (considerando símbolos como qualquer coisa que não seja letra ou número)
	const hasSimbol = /[^a-zA-Z0-9]/.test(password);
	if (hasSimbol) {
		throw new BadRequestException("The entered password contain simbol");
	}

	// Se passar por todas as verificações, retorna true
	return true;
}
