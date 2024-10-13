export declare const createAsync: (data: any) => Promise<{
    id: number;
    CPF: bigint;
    nome: string;
    email: string;
    data_nascimento: Date;
    CEP: string;
    telefone: bigint;
    senha: string;
}>;
export declare const verificaLoginAsync: (email: any, senha: any) => Promise<boolean>;
