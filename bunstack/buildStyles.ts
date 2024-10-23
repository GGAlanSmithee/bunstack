import { exec } from "child_process"

// https://stackoverflow.com/questions/72919826/how-to-use-tailwind-with-bun
// todo: make dynamic for all styles

const command = "bun tailwindcss -i ./src/styles/styles.css -o ./public/styles.css"

export const buildStyles = () =>
  new Promise((resolve, reject) => {
    exec(command, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve("✔️  Styles built successfully")
      }
    })
  })
