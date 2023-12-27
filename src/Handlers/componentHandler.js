function loadComponents(client) {
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading('File Name', 'Status');
    require('colors');

    let buttonsArray = [];
    let stringSelectMenusArray = [];
    let modalsArray = [];

    const componentsFolder = fs.readdirSync('./src/Components');
    for (const folder of componentsFolder) {
        const componentFiles = fs
            .readdirSync(`./src/Components/${folder}`)
            .filter((file) => file.endsWith('.js'));
        switch (folder) {
            case 'Buttons':
                for (const file of componentFiles) {
                    const buttonFile = require(`../Components/${folder}/${file}`);

                    const properties = { folder, ...buttonFile };
                    client.buttons.set(buttonFile.data.name, properties);
                    buttonsArray.push(buttonFile.data.name);

                    table.addRow(file, 'Loaded');
                    continue;
                }
                break;

            case 'SelectMenus':
                for (const file of componentFiles) {
                    const stringSelectMenuFile = require(`../Components/${folder}/${file}`);

                    const properties = { folder, ...stringSelectMenuFile };
                    client.stringSelectMenus.set(stringSelectMenuFile.data.name, properties);
                    stringSelectMenusArray.push(stringSelectMenuFile.data.name);

                    table.addRow(file, 'Loaded');
                    continue;
                }
                break;

            case 'Modals':
                for (const file of componentFiles) {
                    const modalFile = require(`../Components/${folder}/${file}`);

                    const properties = { folder, ...modalFile };
                    client.modals.set(modalFile.data.name, properties);
                    modalsArray.push(modalFile.data.name);

                    table.addRow(file, 'Loaded');
                    continue;
                }
                break;
            default:
                break;
        }
    }
    return console.log(table.toString(), '\n[+]'.green + ' Loaded Components');
}




module.exports = { loadComponents };
