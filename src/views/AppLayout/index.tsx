import Container from "@mui/material/Container";
import Header from "../../components/Header.tsx";

type Props = {
    Component: any;
};

const AppLayout = ({ Component }: Props) => (
    <>
        <Header />
        <Container maxWidth="lg">
            <Component />
        </Container>
    </>
);

export default AppLayout;
