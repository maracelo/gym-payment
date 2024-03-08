import {Container, Form, WarningMessage} from "../styled";

type Props = {
  children: JSX.Element,
  handleShowForm: () => void,
  warningMessage: {msg: string, type: 'err' | 'success'}
}

function EditForm({children, handleShowForm, warningMessage}: Props){
  return (
    <Container id="editForm">
      <Form className="form" onSubmit={(e: any) =>{e.preventDefault()}}>
        <p className="X"><span onClick={handleShowForm}>X</span></p>

        <h4>Change Admin's information below</h4>

        {warningMessage.msg && <WarningMessage $warning={warningMessage.type}>{warningMessage.msg}</WarningMessage>}

        {children}
      </Form>
    </Container>
  );
}

export default EditForm;