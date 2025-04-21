export const BLUE_COLOR_BUTTON = `bg-[linear-gradient(180deg,_#5C9EFE_0%,_#375F98_100%)] hover:bg-[linear-gradient(180deg,_#FE5C5C_0%,_#983737_100%)] `;
export const GREEN_COLOR_BUTTON = `bg-[linear-gradient(180deg,_#5CFE8D_0%,_#379854_100%)] hover:bg-[linear-gradient(180deg,_#FE5C5C_0%,_#983737_100%)] `;
export const GRAY_COLOR_BUTTON = `bg-[linear-gradient(180deg,_#D9D9D9_0%,_#737373_100%)]`;
export const RED_COLOR_BUTTON = `bg-[linear-gradient(180deg,_#FE5C5C_0%,_#983737_100%)]`;




type ButtonProps = {
    type?: string;
    label: string;
    onClick?: () => void;
    className?: string;
    
};

type ButtonLoginProps = {
    onClick?: () => void;
    className?: string;
};

type ButtonRegisterProps = {
    onClick?: () => void;
    className?: string;
};

type ButtonCreateAccountProps = {
    onClick?: () => void;
    className?: string;
};


export const CustomButton = ({ label, onClick, className }: ButtonProps) => {
    return (
        <button className={className} onClick={onClick} >{label} </button>
    );
}

export const LoginButton = ({ onClick, className }: ButtonLoginProps) => {
    return (
        <CustomButton
            label={"Iniciar Sesion"}
            className={` w-[167px] h-[44px] ${BLUE_COLOR_BUTTON}  rounded-full text-white ${className} `}
            onClick={onClick}
        />
    )

}


export const RegisterButton = ({ onClick, className }: ButtonRegisterProps) => {
    return (
        <CustomButton
            label={"Registrarse"}
            className={` w-[167px] h-[44px] ${GREEN_COLOR_BUTTON} rounded-full text-white ${className} `}
            onClick={onClick}
        />
    )

}

export const CreateAccountButton = ({onClick, className }: ButtonCreateAccountProps) => {
    return (
        <CustomButton
            type={"submit"}
            label={"Crear Cuenta"}
            className={` self-center shadow-md px-4 py-2  font-semibold w-[167px] h-[44px] ${GREEN_COLOR_BUTTON}  rounded-full text-white ${className} `}
            onClick={onClick}
        />
    )

}

export const AddButton = ({ onClick, className }: ButtonCreateAccountProps) => {
    return (
        <CustomButton
            label={"Add"}
            className={` w-[167px] h-[44px] ${GREEN_COLOR_BUTTON} rounded-full text-white ${className} `}
            onClick={onClick}
        />
    )
}

export const ExportButton = ({ onClick, className }: ButtonCreateAccountProps) => {
  return (
    <CustomButton
      label={"Export"}
      className={` w-[167px] h-[44px] ${GREEN_COLOR_BUTTON} rounded-full text-white ${className} `}
      onClick={onClick}
    />
  );
};
