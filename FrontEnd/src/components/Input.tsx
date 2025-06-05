

interface Inputprops{
    type :string
    placeholder : string
    reference? : any
}


export function Input(props : Inputprops){

    return <div className="m-2 border border-[#7c7c7c] rounded-md">
        <input ref={props.reference} type={props.type} placeholder={props.placeholder} className="px-2"></input>
    </div>

}