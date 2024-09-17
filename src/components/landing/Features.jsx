export const Features = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Store, Organize, Interact
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need in your second brain
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            MindBlock helps you capture, organize, and interact with all your
            thoughts and content in one place.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  {/* Add appropriate icon here */}
                </div>
                Upload Anything
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Notes, documents, web pages - MindBlock accepts and processes
                all types of content.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  {/* Add appropriate icon here */}
                </div>
                AI-Powered Organization
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Our AI automatically categorizes and links your content for easy
                retrieval.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  {/* Add appropriate icon here */}
                </div>
                Interactive Chat
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Chat with your content to find information, generate ideas, or
                get summaries.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  {/* Add appropriate icon here */}
                </div>
                Secure and Private
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Your thoughts and content are encrypted and accessible only to
                you.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
