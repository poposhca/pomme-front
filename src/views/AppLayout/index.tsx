import { Children } from "react";
import Container from "@mui/material/Container";
import Header from "../../components/Header";

type Props = {
    children: any;
};

const AppLayout = ({ children }: Props) => (
    <>
        <Header />
        <Container maxWidth="lg">
            {Children.map(children, (child) => child)}
        </Container>
    </>
);

export default AppLayout;
