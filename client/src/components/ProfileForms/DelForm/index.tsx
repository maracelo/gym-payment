import {Container, Form, WarningMessage} from "../styled";

type Props = {
  children: JSX.Element,
  handleShowForm: () => void,
  warningMessage: {msg: string, type: 'err' | 'success'}
}

function DelForm({children, handleShowForm, warningMessage}: Props){
  return (
    <Container id="delForm">
      <Form className="form" onSubmit={(e: any) =>{e.preventDefault()}}>
        <p className="X"><span onClick={handleShowForm}>X</span></p>

        <h4>Do you really want to delete your Admin?</h4>

        {warningMessage.msg && <WarningMessage $warning={warningMessage.type}>{warningMessage.msg}</WarningMessage>}

        {children}
      </Form>
    </Container>
  );
}

export default DelForm;