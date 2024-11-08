# Adding a New Language to the Project

This guide will walk you through the steps required to add a new language to the project.

## Prerequisites

Before you begin, ensure you have the following:

- Access to the project's source code
- Basic understanding of the project's internationalization setup
- The language code for the new language (e.g., `fr` for French, `es` for Spanish)

## Steps to Add a New Language

1. **Create a New Language File**

   Navigate to the directory where language files are stored. This is typically a folder named `locales` or `i18n`.

   ```bash
   cd apps/client/locales
   ```

   Create a new file for the language you want to add. For example, to add French, create a file named `fr.json`.

   ```bash
   touch /fr/peppermint.json
   ```

2. **Add Translations**

   Open the newly created language file and add the necessary translations. Use the existing language files as a reference for the structure.

   Copy the contents of the English file and translate it to the new language.

   ```json
   {
     "welcome": "Bienvenue",
     "login": "Connexion",
     "logout": "Déconnexion"
   }
   ```

3. **Update Language Configuration**

   If your project has a configuration file for supported languages (e.g., `config.js` or `i18n.js`), add the new language to the list of supported languages.

   ```javascript
   // i18n.js
   export const supportedLanguages = ["en", "fr", "es"];
   ```

4. **Test the New Language**

   Start your application and switch to the new language to ensure that translations are displayed correctly. This might involve changing a language setting in your application or using a URL parameter.

   This requires you to have the application running.

   ```bash
   yarn install --legacy-peer-deps
   cd apps/api && npm run db:migrate
   cd ../../
   yarn dev --filter=client --filter=api
   ```

   Access the application and switch to French:

   ```
   http://localhost:3000/fr/
   ```

5. **Update Documentation**

   If your project includes user documentation, update it to reflect the addition of the new language. This might include updating language selection instructions or adding a note about the new language support.

6. **Commit Your Changes**

   Once you have verified that the new language is working correctly, commit your changes to the version control system.

   ```bash
   git add .
   git commit -m "Add French language support"
   git push origin your-branch-name
   ```

## Additional Resources

- [Internationalization Best Practices](https://link-to-best-practices)
- [Localization Tools and Libraries](https://link-to-tools)

## Troubleshooting

If you encounter any issues, consider the following:

- Ensure that the language file is correctly formatted and contains all necessary translations.
- Verify that the language configuration is updated to include the new language.
- Check the console for any errors related to missing translations.

---

Feel free to reach out to the project maintainers if you have any questions or need further assistance. Happy localizing!
