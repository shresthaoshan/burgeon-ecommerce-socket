class Database {
    constructor(model) {
        this.Model = model
    }

    #Filter = data => {
        data = { ...data._doc }
        delete data.__v
        return data
    }
    
    Add = async params => {
        const saveThis = new this.Model({ ...params })

        let recorded = await saveThis.save()

        return this.#Filter(recorded)
    }

    Remove = async params => {
        const removedRecord = await this.Model.findOneAndDelete({ ...params })

        if (!removedRecord) throw "No record to remove."

        return this.#Filter(removedRecord)
    }

    RetrieveOne = params => this.Model.findOne(params)

    RetrieveOneFiltered = async params => {
        const oneRecord = await this.RetrieveOne(params)

        if (!oneRecord) throw "No record found."

        return this.#Filter(oneRecord)
    }
    
    RetrieveAll = (params, options = '') => this.Model.find(params, options).exec()

    RetrieveAllFiltered = async (params, options = '') => {
        let records = await this.RetrieveAll(params, options)

        if (!records) throw "No record found."

        records.forEach(item => this.#Filter(item))

        return records
    }

    Search = (searchFor, filter) => {
        const { fields, limit, caseSensitive } = filter

        searchFor = searchFor.toString().trim()

        let $text = { $search: searchFor }

        if (caseSensitive) $text.$caseSensitive = true

        let searchQuery = this.Model.find({ $text }, fields, { score: { $meta: "textScore" } })

        if (limit) searchQuery = searchQuery.limit(parseInt(limit))
        
        return searchQuery.exec()
    }
    
    UpdateRecord = async (_id, params) => {
        const updatedRecord = await this.Model.findOneAndUpdate({ _id }, params, { new: true })
        if (!updatedRecord) throw "No record matched the specified criteria."
        return this.#Filter(updatedRecord)
    }
}

module.exports = Database