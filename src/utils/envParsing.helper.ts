interface VarConfig {
  key: string;
  isRequired?: boolean;
  default?: string;
  devDefault?: string; // default value, which will be set only if NODE_ENV !== production
}

export const getOsEnv = (config: VarConfig): string => {
  const handleUndefinedValue = (config: VarConfig) => {
    if (config.default !== undefined) {
      return config.default;
    } else if (
      process.env.NODE_ENV !== 'production' &&
      config.devDefault !== undefined
    ) {
      return config.devDefault;
    } else if (config.isRequired) {
      throw new Error(`${config.key} is required and undefined`);
    }
  };

  let value = process.env?.[config.key];
  value = value ?? handleUndefinedValue(config);
  return value as string;
};
