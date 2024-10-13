export declare const createAsync: (data: any) => Promise<{
    id: number;
    CNPJ: bigint;
    nome_fantasia: string;
    razao_social: string;
    ctt_1: string;
    telefone_1: bigint;
    ctt_2: string;
    telefone_2: bigint;
    email: string;
    site: string;
    instagram: string;
    CEP: string;
    obs: string;
    ativo: boolean;
    senha: string;
}>;
export declare const verificaLoginAsync: (email: any, senha: any) => Promise<boolean>;
