# Can we skip the dishes, @guicheffer?
👀 Yes we can! This is a basic spa (no server-side rendering) for displaying products and customers orders.

**ps**. not so seo friendly 😩

## How to install
Please, `make i` or `make install`

## How to contribute
- Run the command `make watch` for watching updates or `make build` to get project assets compiled. (`make build-prod` should resolve prod dependencies)
- Commit your changes, then create your pull request

## How to run
Just `make run` and we're ready to rock! Access your http://localhost:3000/

## Hey, run it on the live demo! ❤️
Create that as well: https://can-we-skip-the-dishes.herokuapp.com/

You can login with: `can-we-skip-the-dishes@guicheffer.me` as the email and the password: `yeswecan`

### Choice of Stack
- react-toolbox
	- I already used in live projects and it worths for small applications which there are many components that could reused or anything like this BUT I still think a minor and default styleguide needs to be implemented such as our given `src/app/styleguide/*`
- react
	- ...
- redux
	- ...
- webpack
	- ...
- stylus
	- ...

⬆️ explain those later

I'm sorry for not completing the test, there were too details I wanted to adjust, that's why I got lost in time.

BUT!

I would certainly add the missing features if I had focused on the architecture, instead only of the client-side details.

___
This is how the account profile to Login was created:
```javascript
{
  "email": "can-we-skip-the-dishes@guicheffer.me",
  "name": "Joao Guilherme",
  "address": "123 Dishes Ave",
  "creation": "2018-03-18T13:09:29.727Z",
  "password": "yeswecan"
}
```
___

## Todo
- [ ] Improve README.md
- [ ] Create your project board on [GitHub projects](https://help.github.com/articles/about-project-boards/)
- [ ] Preview your page and paste wireframes that represents your changes
