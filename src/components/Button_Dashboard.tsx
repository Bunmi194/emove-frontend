//import  "../styles/_buttonDashboard.css";



const Button = (props: { text: string; formText: string,  bookTrip: string}) => {
    const text: string = props.text;
    const formText: string = props.formText;
    const bookTrip: string = props.bookTrip;
    
    return ( 
        <button className="btn btnDashboard" type="submit">{ bookTrip || text || formText } </button>)
}
 
export default Button;