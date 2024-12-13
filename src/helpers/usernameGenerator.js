const usernameGenerator = (name) => {
    let modifiedName = name
        .replace(/a/g, '@')
        .replace(/i/g, '1')
        .replace(/o/g, '0')
        .replace(/e/g, '3')
        .replace(/s/g, '5')

    // Asegurarse de que la primera letra sea mayúscula
    modifiedName = modifiedName.charAt(0).toUpperCase() + modifiedName.slice(1);

    // Generar 4 números aleatorios
    let randomNumbers = Math.floor(Math.random() * 10000); // Números entre 0 y 9999

    return modifiedName + randomNumbers;
}


export default usernameGenerator