import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";
import { describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

describe('<Blog />', () => {
    test('renders title and author by default, but not url or likes', () => {
        const blog = {title: 'Fake Blog', author: 'Tester', likes: 0, url: 'www.test.com', user: {name: 'Creater'}}
        const {container} = render(<Blog blog={blog}/>)

        const titleElement = screen.getByText('Fake Blog')
        const authorElement = screen.getByText('Tester')
        const infoContainer = container.querySelector('.info')  

        expect(titleElement).not.toHaveStyle('display: none')
        expect(authorElement).not.toHaveStyle('display: none')
        expect(infoContainer).toHaveStyle('display: none')        
    })
    
    test('renders URL and number of likes after pressing "show" button', async () => {
        const blog = {title: 'Fake Blog', author: 'Tester', likes: 0, url: 'www.test.com', user: {name: 'Creater'}}
        const user = userEvent.setup()        
        const {container} = render(<Blog blog={blog}/>)

        const button = screen.getByText('show')
        await user.click(button)
        
        const infoContainer = container.querySelector('.info')
        const urlElement = screen.getByText('www.test.com')
        const likesElement = screen.getByText('likes: 0')

        expect(infoContainer).not.toHaveStyle('display: none')
        
        

        
        


    })
})