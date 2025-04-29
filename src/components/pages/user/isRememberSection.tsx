import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

export default function IsRememberSection({ isRemember, setIsRemember, text }: { isRemember: boolean, setIsRemember: React.Dispatch<React.SetStateAction<boolean>>, text?: string }) {

    return (
        <div className='flex flex-row items-center mt-4'>
            {/* The style of the checkbox is refered from https://www.material-tailwind.com/docs/html/checkbox */}
            <label htmlFor='remember' className='flex items-center cursor-pointer relative mx-1'>
                <div
                    className='cursor-pointer'
                    onClick={() => setIsRemember(!isRemember)}
                >
                    {isRemember ? (
                        <MdCheckBox className='text-cyan-500' size={24} />
                    ) : (
                        <MdCheckBoxOutlineBlank className='text-gray-600' size={24} />
                    )}
                </div>
            </label>
            <label htmlFor='remember' className='text-black font-bold text-sm lg:text-base'>
                {text}
            </label>
        </div>
    );
}

