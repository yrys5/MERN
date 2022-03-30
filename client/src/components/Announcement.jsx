import styled from "styled-components"

const Container = styled.div`
height:30px;
background-color: teal;
color: white;
display: flex;
align-items: center;
font-size: 14px;
justify-content: center;
font-weight: 500;
`

export const Announcement = () => {
    return (
        <Container>
            Super Deal! Free sugar on orders over 50$
        </Container>
    )
}
export default Announcement
