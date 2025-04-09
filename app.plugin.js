const fs = require("fs");
const path = require("path");
const {
  withAndroidManifest,
  withDangerousMod,
} = require("@expo/config-plugins");

module.exports = function withCustomNetworkSecurityConfig(config) {
  // 1. Aggiunge il riferimento nel manifest
  config = withAndroidManifest(config, async (config) => {
    const application = config.modResults.manifest.application[0];
    application.$["android:networkSecurityConfig"] = "@xml/network_security_config";
    return config;
  });

  // 2. Copia il file XML nella build Android
  config = withDangerousMod(config, [
    "android",
    async (config) => {
      const sourcePath = path.join(__dirname, "assets/xml/network_security_config.xml");
      const targetDir = path.join(config.modRequest.projectRoot, "android/app/src/main/res/xml");
      const targetPath = path.join(targetDir, "network_security_config.xml");

      // Crea la directory se non esiste
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Copia il file
      fs.copyFileSync(sourcePath, targetPath);
      console.log("✅ Copiato network_security_config.xml in", targetPath);

      return config;
    },
  ]);

  return config;
};
