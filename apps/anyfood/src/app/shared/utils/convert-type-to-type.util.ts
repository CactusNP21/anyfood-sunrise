export type TConvertTypeToType<Type, ToType, Model extends object> = {
  [K in keyof Model]: Model[K] extends Type ? ToType : Model[K];
};

export type TConvertNumberToString<Model extends object> = TConvertTypeToType<number, string, Model>
