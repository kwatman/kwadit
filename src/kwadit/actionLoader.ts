export default async function actionloader() {
  const actions = []
  const modulePaths = import.meta.glob('./core/actions/**/index.ts')
  // Loop through the contents
  //   console.log(await modulePaths['./core/actions/Headings/index.ts']())

  for (const path in modulePaths) {
    const module = await modulePaths[path]()
    actions.push(module.default)
  }
  return actions
}
